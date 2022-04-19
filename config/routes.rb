Rails.application.routes.draw do
  
  resources :users, only: [:index, :destroy]
  resources :pets, only: [:update, :destroy, :create]
  resources :applications, only: [:create, :destroy, :update]
  resources :bookmarks, exclude: [:show, :update]
  resources :shelters, only: [:update, :destroy]
  resources :customers, only: [:update, :destroy]
  post "/signup-customer", to: 'customers#create'
  post '/signup-shelter', to: 'shelters#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  get '/shelter-pets', to: 'pets#shelter_index'
  get '/adopted-pets', to: 'pets#adopted_pet_index'
  get '/customer-pets', to: 'pets#customer-index'
  get '/shelter-applications', to: 'pet_applications#shelter_index'
  get '/customer-applications', to: 'pet_applications#customer_index'
  patch '/pets/:pet_id/applications/:id', to: 'pet_applications#adopt'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
