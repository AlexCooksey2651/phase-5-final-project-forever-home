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
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
