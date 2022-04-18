Rails.application.routes.draw do
  
  resources :pets
  resources :applications
  resources :bookmarks
  resources :shelters, exclude: [:create]
  resources :customers, exclude: [:create]
  post "/signup-customer", to: 'customers#create'
  post '/signup-shelter', to: 'shelters#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  get '/shelter-pets', to: 'pets#shelter_index'
  get '/customer-pets', to: 'pets#customer-index'
  patch '/pets/:pet_id/applications/:id', to: 'pets#adopt'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
