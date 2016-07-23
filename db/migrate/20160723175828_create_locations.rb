class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :latitude
      t.string :longitude
      t.string :address
      t.string :google_place_id

      t.timestamps
    end
  end
end