class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  BLANK_NORMALIZER = ->(value) { nil_if_blank(value) }

  private_class_method def self.nil_if_blank(value)
    value.blank? ? nil : value
  end
end
