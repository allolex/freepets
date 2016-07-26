Rails.application.routes.draw do
  root to: "home#index"

  get 'home/index'

  resources :locations, only: [:create, :show]
end
