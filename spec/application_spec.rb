require 'rails_helper'

RSpec.describe 'Application' do
  it 'runs without errors' do
    expect { Rails.application }.not_to raise_error
  end
end
