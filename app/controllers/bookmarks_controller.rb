class BookmarksController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    # def create
    #     user = User.find_by(id: session[:user_id])
    #     if user
    #         new_bookmark = user.profile.bookmarks.create!(pet_id: params[:pet_id])
    #         render json: new_bookmark, status: :created
    #     else
    #         render json: {error: "User not found"}, status: :not_found
    #     end
    # end
    def create 
        bookmark = Bookmark.create!(pet_id: params[:pet_id], customer_id: params[:customer_id])
        render json: bookmark, status: :created
    end

    def destroy
        bookmark = Bookmark.where("pet_id = ? AND customer_id = ?", params[:pet_id], params[:customer_id]).first
        if bookmark
            # render json: bookmark
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
            shown_bookmarks = bookmarks.filter { |bookmark| bookmark.pet.adoption_status != "Adopted" }
        # want to only show ones where pet adoption_status isn't adopted
            render json: shown_bookmarks, include: ['pet', 'pet.shelter', 'pet.shelter.user', 'customer'], status: :ok
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
