# frozen_string_literal: true

module Api
  module V1
    class HashtagsController < ApplicationController
      before_action :authenticate_user!

      def index
        hashtags = Hashtag.all
        render json: hashtags
      end

      def show
        hashtag_identifier = params[:hashtag_identifier]

        # if params[:hashtag_identifier] is numeric, find by id, else find by tag
        hashtag = if hashtag_identifier.to_i.to_s == hashtag_identifier
                    Hashtag.find(hashtag_identifier)
                  else
                    Hashtag.find_by(tag: hashtag_identifier)
                  end

        render json: hashtag.tweets.includes(:user).order(created_at: :desc)
      end
    end
  end
end
