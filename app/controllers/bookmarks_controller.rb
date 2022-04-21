class BookmarksController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        user = User.find_by(id: session[:user_id])
        if user
            new_bookmark = user.profile.bookmarks.create!(pet_id: params[:pet_id])
            render json: new_bookmark, status: :created
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy
        bookmark = Bookmark.find_by(id: params[:id])
        if bookmark
            bookmark.destroy
            head :no_content
        else
            render json: {error: "Bookmark not found"}, status: :not_found
        end
    end

    def index
        user = User.find_by(id: session[:user_id])
        if user
            bookmarks = user.profile.bookmarks
            render json: bookmarks, include: ['pet', 'pet.shelter', 'pet.shelter.user'], status: :ok
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private
    
    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def bookmark_params
        params.permit(:pet_id)
    end
end
