json.extract! location, :id, :latitude, :longitude, :address, :google_place_id, :created_at, :updated_at
json.url location_url(location, format: :json)