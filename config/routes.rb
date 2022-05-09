Rails.application.routes.draw do
  
  resources :users, only: [:index]
  resources :pets, exclude: [:index]
  resources :pet_applications, only: [:create, :destroy, :update]
  resources :bookmarks, exclude: [:show, :update, :destroy]
  resources :shelters, only: [:index]
  resources :customers, only: [:index]
  post "/signup-customer", to: 'customers#create'
  patch "/customers/:id", to: 'customers#update'
  delete "/customers/:id", to: 'customers#destroy'
  post '/signup-shelter', to: 'shelters#create'
  patch "/shelters/:id", to: "shelters#update"
  delete "/shelters/:id", to: "shelters#destroy"
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  get '/shelter-pets', to: 'pets#shelter_index'
  get '/adopted-pets', to: 'pets#adopted_pets_index' 
  get '/customer-pets', to: 'pets#customer_index'
  get '/shelter-applications', to: 'pet_applications#shelter_index'
  get '/customer-applications', to: 'pet_applications#customer_index'
  patch '/pets/:pet_id/applications/:id', to: 'pet_applications#adopt'
  delete 'bookmarks/:customer_id/:pet_id', to: 'bookmarks#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

# , only: [:update, :destroy, :create, :index, :show]