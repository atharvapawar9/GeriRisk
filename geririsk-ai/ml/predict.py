import sys
import json
import joblib
import numpy as np

BASE_PATH = "ml/models"

# Load models and scalers once
cardiac_model = joblib.load(f"{BASE_PATH}/cardiac_risk_model.pkl")
cardiac_scaler = joblib.load(f"{BASE_PATH}/cardiac_scaler.pkl")

fall_model = joblib.load(f"{BASE_PATH}/fall_risk_model.pkl")
fall_scaler = joblib.load(f"{BASE_PATH}/fall_scaler.pkl")

resp_model = joblib.load(f"{BASE_PATH}/respiratory_risk_model.pkl")
resp_scaler = joblib.load(f"{BASE_PATH}/respiratory_scaler.pkl")


def risk_level(score):
    if score >= 0.75:
        return "High"
    if score >= 0.4:
        return "Moderate"
    return "Low"


def predict(features):
    # Cardiac
    cardiac_X = np.array([[ 
        features["avgHeartRate"],
        features["maxHeartRate"],
        features["minHeartRate"],
        features["minSpO2"],
        features["totalSteps"],
        features["recordCount"]
    ]])
    cardiac_prob = cardiac_model.predict_proba(
        cardiac_scaler.transform(cardiac_X)
    )[0][1]

    # Fall
    fall_X = np.array([[
        features["avgHeartRate"],
        features["totalSteps"],
        features["recordCount"]
    ]])
    fall_prob = fall_model.predict_proba(
        fall_scaler.transform(fall_X)
    )[0][1]

    # Respiratory
    resp_X = np.array([[
        features["minSpO2"],
        features["avgHeartRate"],
        features["recordCount"]
    ]])
    resp_prob = resp_model.predict_proba(
        resp_scaler.transform(resp_X)
    )[0][1]

    return {
        "cardiacRisk": {
            "score": round(float(cardiac_prob), 3),
            "level": risk_level(cardiac_prob)
        },
        "fallRisk": {
            "score": round(float(fall_prob), 3),
            "level": risk_level(fall_prob)
        },
        "respiratoryRisk": {
            "score": round(float(resp_prob), 3),
            "level": risk_level(resp_prob)
        }
    }


if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    result = predict(input_data)
    print(json.dumps(result))
