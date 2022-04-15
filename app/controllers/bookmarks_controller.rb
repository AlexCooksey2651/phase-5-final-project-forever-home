class BookmarksController < ApplicationController
    def create
        user = User.find_by(id: session[:user_id])
        new_bookmark = user.profile.bookmarks.create!(pet_id: params[:pet_id])
        render json: new_bookmark, status: :created
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
        bookmarks = user.profile.bookmarks
        render json: bookmarks, status: :ok
    end

    private
end
