// Real-time location and weather service using free, keyless Open-Meteo & multi-tier Geocoding APIs

export interface WeatherData {
  city: string;
  district?: string;
  country?: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  gardeningAdviceEn: string;
  gardeningAdviceTa: string;
  gardeningAdviceTanglish: string;
  weatherCode: number;
  isDay: boolean;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  source?: 'gps' | 'ip' | 'manual';
}

export interface GeocodedLocation {
  name: string;
  displayName: string;
  admin1?: string; // State / Region
  country?: string;
  lat: number;
  lon: number;
}

const STORAGE_KEY_WEATHER = 'plant_doctor_weather_data';
const STORAGE_KEY_LOCATION = 'plant_doctor_active_location';

export function getSavedWeatherData(): WeatherData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WEATHER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveWeatherData(data: WeatherData): void {
  try {
    localStorage.setItem(STORAGE_KEY_WEATHER, JSON.stringify(data));
    localStorage.setItem(
      STORAGE_KEY_LOCATION,
      JSON.stringify({
        city: data.city,
        district: data.district,
        country: data.country,
        lat: data.latitude,
        lon: data.longitude
      })
    );
  } catch (e) {
    console.warn('Could not persist weather data to storage', e);
  }
}

// Convert Open-Meteo WMO weather code to readable descriptions and agricultural advice
export function parseWeatherCode(code: number, temp: number): {
  condition: string;
  adviceEn: string;
  adviceTa: string;
  adviceTanglish: string;
} {
  if (code === 0) {
    if (temp > 34) {
      return {
        condition: 'Intense Sunlight',
        adviceEn: 'Scorching sun: Water plants early morning and provide afternoon shade net.',
        adviceTa: 'கடும் வெயில்: அதிகாலை நீர் பாய்ச்சவும்; மதிய வெயிலுக்கு நிழல்வலை அமைக்கவும்.',
        adviceTanglish: 'Romba veyyil: Kaalaila thanni oothunga, madhiyanam shade kuduங்க.'
      };
    }
    return {
      condition: 'Clear Sunny Sky',
      adviceEn: 'Clear & sunny: Perfect day for photosynthesizing crops and foliar spraying.',
      adviceTa: 'தெளிவான வெயில்: பயிர்கள் வளர்ச்சிக்கும் உரம் தெளிக்கவும் மிகச் சிறந்த நாள்.',
      adviceTanglish: 'Nalla veyyil: Chedi nalla valarum, spray panna nalla time.'
    };
  } else if (code >= 1 && code <= 3) {
    return {
      condition: 'Partly Cloudy',
      adviceEn: 'Mild & pleasant: Ideal conditions for transplanting and agricultural field work.',
      adviceTa: 'லேசான மேகமூட்டம்: நாற்று நடுதல் மற்றும் உழவுப் பணிகளுக்கு உகந்தது.',
      adviceTanglish: 'Lesaana clouds: Naathu nada nalla climate.'
    };
  } else if (code >= 45 && code <= 48) {
    return {
      condition: 'Foggy / Mist',
      adviceEn: 'High humidity & mist: Watch for fungal spores on lower foliage.',
      adviceTa: 'பனிமூட்டம்: இலைகளில் பூஞ்சாண நோய் வராமல் கண்காணிக்கவும்.',
      adviceTanglish: 'Panimootam: Fungal disease varama paathukonga.'
    };
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      condition: 'Rain Showers',
      adviceEn: 'Rainy: Hold off watering today. Ensure drainage channels are clear.',
      adviceTa: 'மழை பெய்கிறது: இன்று நீரூற்றுவதை தவிர்க்கவும்; வடிகால் வசதி செய்யவும்.',
      adviceTanglish: 'Mazhai peyyuthu: Innaiku thanni ootha venaam, drainage check pannunga.'
    };
  } else if (code >= 95) {
    return {
      condition: 'Thunderstorm',
      adviceEn: 'Thunderstorm: Secure delicate seedlings and tall plants from high winds.',
      adviceTa: 'இடி மின்னலுடன் மழை: பலத்த காற்றிலிருந்து இளம் கன்றுகளைப் பாதுகாக்கவும்.',
      adviceTanglish: 'Idimazhai: Kaathula chedi saayatha maari support pannunga.'
    };
  }

  return {
    condition: 'Pleasant Weather',
    adviceEn: 'Balanced weather: Suitable for regular crop care and irrigation.',
    adviceTa: 'சமநிலையான வானிலை: வழக்கமான பயிர் பராமரிப்புக்கு ஏற்றது.',
    adviceTanglish: 'Normal weather: Regular watering pannalaam.'
  };
}

// Reverse geocode latitude & longitude to human-readable City/Town name
async function reverseGeocode(lat: number, lon: number): Promise<{ city: string; district: string; country: string }> {
  // Method 1: BigDataCloud (CORS enabled, highly accurate in India)
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.locality || data.city || data.principalSubdivision || 'Current Location';
      const district = data.principalSubdivision || '';
      const country = data.countryName || 'India';
      return { city, district, country };
    }
  } catch (e) {
    console.warn('BigDataCloud reverse geocode error, trying OSM fallback', e);
  }

  // Method 2: OpenStreetMap Nominatim fallback
  try {
    const osmRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    if (osmRes.ok) {
      const osmData = await osmRes.json();
      const addr = osmData.address || {};
      const city = addr.city || addr.town || addr.village || addr.suburb || addr.state_district || 'Current Location';
      const district = addr.state_district || addr.state || '';
      const country = addr.country || 'India';
      return { city, district, country };
    }
  } catch (e) {
    console.warn('OSM reverse geocode error', e);
  }

  return { city: 'Current Location', district: '', country: 'India' };
}

// Fetch real-time weather and location details from Open-Meteo
export async function fetchWeatherForCoordinates(
  lat: number,
  lon: number,
  overrideCity?: string,
  overrideDistrict?: string
): Promise<WeatherData> {
  let cityName = overrideCity || '';
  let districtName = overrideDistrict || '';
  let countryName = 'India';

  if (!cityName) {
    const geo = await reverseGeocode(lat, lon);
    cityName = geo.city;
    districtName = geo.district;
    countryName = geo.country;
  }

  // Fetch current weather from Open-Meteo
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=auto`
  );

  if (!weatherRes.ok) {
    throw new Error('Could not fetch weather data from Open-Meteo');
  }

  const wData = await weatherRes.json();
  const current = wData.current;
  const temp = Math.round(current.temperature_2m);
  const code = current.weather_code || 0;
  const parsed = parseWeatherCode(code, temp);

  const result: WeatherData = {
    city: cityName || 'Current Location',
    district: districtName,
    country: countryName,
    temperature: temp,
    feelsLike: Math.round(current.apparent_temperature || temp),
    humidity: Math.round(current.relative_humidity_2m || 65),
    windSpeed: Math.round(current.wind_speed_10m || 10),
    condition: parsed.condition,
    gardeningAdviceEn: parsed.adviceEn,
    gardeningAdviceTa: parsed.adviceTa,
    gardeningAdviceTanglish: parsed.adviceTanglish,
    weatherCode: code,
    isDay: current.is_day === 1,
    latitude: lat,
    longitude: lon,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: overrideCity ? 'manual' : 'gps'
  };

  saveWeatherData(result);
  return result;
}

// Fetch via reliable CORS-enabled IP Geolocation APIs
export async function fetchIPLocationWeather(): Promise<WeatherData> {
  // Method 1: geojs.io (Free, CORS enabled, no rate limits, ultra reliable worldwide)
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (res.ok) {
      const data = await res.json();
      const lat = parseFloat(data.latitude);
      const lon = parseFloat(data.longitude);
      if (!isNaN(lat) && !isNaN(lon)) {
        const weather = await fetchWeatherForCoordinates(lat, lon, data.city, data.country);
        weather.source = 'ip';
        return weather;
      }
    }
  } catch (e) {
    console.warn('GeoJS IP lookup failed, trying ipwho.is', e);
  }

  // Method 2: ipwho.is (Free, CORS enabled)
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.latitude && data.longitude) {
        const weather = await fetchWeatherForCoordinates(data.latitude, data.longitude, data.city, data.region);
        weather.source = 'ip';
        return weather;
      }
    }
  } catch (e) {
    console.warn('ipwho.is lookup failed', e);
  }

  // Method 3: freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json');
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        const weather = await fetchWeatherForCoordinates(data.latitude, data.longitude, data.cityName, data.regionName);
        weather.source = 'ip';
        return weather;
      }
    }
  } catch (e) {
    console.warn('freeipapi lookup failed', e);
  }

  // Check saved weather from previous session if available
  const saved = getSavedWeatherData();
  if (saved) return saved;

  // Ultimate fallback: Madurai, Tamil Nadu (9.9252, 78.1198)
  return fetchWeatherForCoordinates(9.9252, 78.1198, 'Madurai', 'Tamil Nadu');
}

// Full live location detection: Browser GPS first, IP fallback if denied or on iframe
export async function detectLiveLocation(): Promise<WeatherData> {
  return new Promise<WeatherData>((resolve) => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const data = await fetchWeatherForCoordinates(pos.coords.latitude, pos.coords.longitude);
            data.source = 'gps';
            resolve(data);
          } catch (err) {
            console.warn('GPS weather fetch failed, attempting IP fallback', err);
            const ipData = await fetchIPLocationWeather();
            resolve(ipData);
          }
        },
        async (err) => {
          console.info('Geolocation permission not granted or timeout; using IP geolocation:', err.message);
          const ipData = await fetchIPLocationWeather();
          resolve(ipData);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
      );
    } else {
      fetchIPLocationWeather().then(resolve);
    }
  });
}

// Search any place name worldwide using Open-Meteo Geocoding
export async function searchLocations(query: string): Promise<GeocodedLocation[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`
    );
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results.map((item: any) => ({
      name: item.name,
      displayName: [item.name, item.admin1, item.country].filter(Boolean).join(', '),
      admin1: item.admin1 || '',
      country: item.country || '',
      lat: item.latitude,
      lon: item.longitude
    }));
  } catch (err) {
    console.warn('Geocoding search error:', err);
    return [];
  }
}

// Popular agricultural locations across Tamil Nadu and South India for 1-tap select
export const POPULAR_LOCATIONS = [
  { name: 'Madurai', district: 'Tamil Nadu', lat: 9.9252, lon: 78.1198 },
  { name: 'Coimbatore', district: 'Tamil Nadu', lat: 11.0168, lon: 76.9558 },
  { name: 'Chennai', district: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Tiruchirappalli (Trichy)', district: 'Tamil Nadu', lat: 10.7905, lon: 78.7047 },
  { name: 'Salem', district: 'Tamil Nadu', lat: 11.6643, lon: 78.1460 },
  { name: 'Thanjavur (Delta)', district: 'Tamil Nadu', lat: 10.7870, lon: 79.1378 },
  { name: 'Erode', district: 'Tamil Nadu', lat: 11.3410, lon: 77.7172 },
  { name: 'Tirunelveli', district: 'Tamil Nadu', lat: 8.7139, lon: 77.7567 },
  { name: 'Dindigul', district: 'Tamil Nadu', lat: 10.3673, lon: 77.9803 },
  { name: 'Theni', district: 'Tamil Nadu', lat: 10.0104, lon: 77.4768 },
  { name: 'Kanyakumari (Nagercoil)', district: 'Tamil Nadu', lat: 8.1833, lon: 77.4119 },
  { name: 'Vellore', district: 'Tamil Nadu', lat: 12.9165, lon: 79.1325 },
  { name: 'Tirupur', district: 'Tamil Nadu', lat: 11.1085, lon: 77.3411 },
  { name: 'Namakkal', district: 'Tamil Nadu', lat: 11.2189, lon: 78.1674 },
  { name: 'Dharmapuri', district: 'Tamil Nadu', lat: 12.1211, lon: 78.1582 },
  { name: 'Thoothukudi', district: 'Tamil Nadu', lat: 8.7642, lon: 78.1348 }
];
