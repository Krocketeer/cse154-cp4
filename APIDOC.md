# Vaccine API Documentation
The Vaccine API provides information about vaccine stock in cities and cities with specified vaccines

## Get list of all cities
**Request Format:** /city/:name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:**
Returns a JSON of available vaccines and number of vaccines in a city


**Example Request:** /city/Seattle

**Example Response:**
```JSON
  {"city": "Seattle", "vaccines":
      [
        {"vaccine-name": "Pfizer", "doses": 10},
        {"vaccine-name": "Moderna", "doses": 10},
        {"vaccine-name": "Johnson & Johnson", "doses": 20}
      ]
  }
```

**Error Handling:**
Possible errors (400 status codes):
- If city does not exist in API: No entries found for {city}. Please try again.

## Get list of cities with vaccine
**Request Format:** /vaccine/;brand

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Given a valid vaccine brand, returns a list of cities with that vaccine in stock

**Example Request:** /vaccine/pfizer

**Example Response:**
*Fill in example response in the {}*

```
Seattle, Kent, Bellevue
```

**Error Handling:**
n/a
