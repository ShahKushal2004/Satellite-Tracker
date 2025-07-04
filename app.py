from fastapi import FastAPI, Query
import requests
from math import radians, cos, sin, sqrt, atan2
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Satellite Tracker API")

# === CORS (for frontend connection) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === CONFIG ===
API_KEY = "CKK37U-FZVFS3-XL7YRW-5ILO"
MY_LAT = 19.075975
MY_LON = 72.877377
ALT = 10
DURATION = 1
ISS_ID = 25544

# === Utility: Haversine Distance ===
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    return R * 2 * atan2(sqrt(a), sqrt(1-a))

# === API: Check Key Validity ===
@app.get("/check-key")
def check_api_key(key: str = Query(..., alias="apiKey")):
    url = f"https://api.n2yo.com/rest/v1/satellite/tle/25544?apiKey={key}"
    r = requests.get(url)
    if r.status_code == 200:
        return {"valid": True}
    else:
        return {"valid": False, "status": r.status_code}

# === API: Get ISS Position ===
@app.get("/iss")
def get_iss_position():
    try:
        url = f"https://api.n2yo.com/rest/v1/satellite/positions/{ISS_ID}/{MY_LAT}/{MY_LON}/{ALT}/{DURATION}/&apiKey={API_KEY}"
        res = requests.get(url).json()
        pos = res['positions'][0]
        lat = pos['satlatitude']
        lon = pos['satlongitude']
        alt = pos['sataltitude']
        dist = haversine(MY_LAT, MY_LON, lat, lon)
        return {
            "name": "ISS (ZARYA)",
            "latitude": lat,
            "longitude": lon,
            "altitude": alt,
            "distance_from_mumbai": dist,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    except Exception as e:
        return {"error": str(e)}

# === API: Get Satellite TLE Info ===
@app.get("/tle/{satellite_id}")
def get_tle_info(satellite_id: int):
    url = f"https://api.n2yo.com/rest/v1/satellite/tle/{satellite_id}?apiKey={API_KEY}"
    res = requests.get(url).json()
    if "info" not in res:
        return {"error": "Invalid Satellite ID or API Error"}
    return {
        "name": res["info"].get("satname"),
        "satid": res["info"].get("satid"),
        "launch_date": res["info"].get("launchDate"),
        "line1": res.get("tle", "").splitlines()[0],
        "line2": res.get("tle", "").splitlines()[1] if len(res.get("tle", "").splitlines()) > 1 else ""
    }

# === API: Get Satellite Position by ID ===
@app.get("/position/{satellite_id}")
def get_satellite_position(satellite_id: int):
    try:
        url = f"https://api.n2yo.com/rest/v1/satellite/positions/{satellite_id}/{MY_LAT}/{MY_LON}/{ALT}/{DURATION}/&apiKey={API_KEY}"
        res = requests.get(url).json()
        pos = res['positions'][0]
        lat = pos['satlatitude']
        lon = pos['satlongitude']
        alt = pos['sataltitude']
        dist = haversine(MY_LAT, MY_LON, lat, lon)
        return {
            "satellite_id": satellite_id,
            "latitude": lat,
            "longitude": lon,
            "altitude": alt,
            "distance_from_mumbai": dist,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    except Exception as e:
        return {"error": str(e)}
