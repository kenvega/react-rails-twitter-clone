class Api::V1::TweetsController < ApplicationController
  before_action :authenticate_user!

  def show
   
  end

  def create
    tweet = Tweet.new(tweet_params.merge(user: current_user))

    tweet.save
  end

  def index
    tweets = Tweet.all.includes(:user).order(created_at: :desc)

    render json: tweets
  end

  private

  def tweet_params
    params.require(:tweet).permit(:body)
  end
end