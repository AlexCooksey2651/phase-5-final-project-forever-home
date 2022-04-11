Rails.application.routes.draw do
  
  resources :pets
  resources :applications
  resources :bookmarks
  resources :shelters
  resources :customers
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
