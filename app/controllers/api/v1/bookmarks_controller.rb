# frozen_string_literal: true

module Api
  module V1
    class BookmarksController < ApplicationController
      before_action :authenticate_user!

      # GET /bookmarks
      def index
        render json: Tweet.where(id: current_user.bookmarks.pluck(:tweet_id))
                          .includes(user: { avatar_attachment: :blob })
                          .order(created_at: :desc)
      end

      # POST /tweets/:tweet_id/bookmark
      def create
        # Creates the bookmark if it doesn't already exist
        current_user.bookmarks.find_or_create_by(tweet_id: params[:tweet_id])
        render json: { bookmarked: true }
      end

      # DELETE /tweets/:tweet_id/bookmark
      def destroy
        bookmark = current_user.bookmarks.find_by(tweet_id: params[:tweet_id])
        bookmark&.destroy

        render json: { bookmarked: false }
      end
    end
  end
end
