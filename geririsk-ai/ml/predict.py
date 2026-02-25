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
    def safe_get(key, default=0):
        """Return a valid float for the feature, or default if missing/NaN."""
        val = features.get(key, default)
        if val is None:
            return float(default)
        try:
            val = float(val)
            if np.isnan(val):
                return float(default)
            return val
        except (ValueError, TypeError):
            return float(default)

    avgHR = safe_get("avgHeartRate", 72)
    maxHR = safe_get("maxHeartRate", 100)
    minHR = safe_get("minHeartRate", 55)
    minSpO2 = safe_get("minSpO2", 95)
    totalSteps = safe_get("totalSteps", 0)
    recordCount = safe_get("recordCount", 1)

    # Cardiac
    cardiac_X = np.array([[ 
        avgHR, maxHR, minHR, minSpO2, totalSteps, recordCount
    ]])
    cardiac_prob = cardiac_model.predict_proba(
        cardiac_scaler.transform(cardiac_X)
    )[0][1]

    # Fall
    fall_X = np.array([[
        avgHR, totalSteps, recordCount
    ]])
    fall_prob = fall_model.predict_proba(
        fall_scaler.transform(fall_X)
    )[0][1]

    # Respiratory
    resp_X = np.array([[
        minSpO2, avgHR, recordCount
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
