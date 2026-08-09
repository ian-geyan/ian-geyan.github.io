# Liquid's `sort` filter only sorts by one field, so it can't rank
# publications by year desc, then month desc, on its own. This computes a
# single numeric `rank` (year, then month, then original file order as a
# tiebreaker for same-month entries — Ruby's sort isn't guaranteed stable)
# and a display `month_name` on each entry in _data/publications.yml, so
# templates can just do:
#   site.data.publications | sort: "rank" | reverse
#
# Implemented as a Generator (not a :site, :pre_render hook) because
# generators run in Jekyll's dedicated pre-render "generate" phase, which
# is the documented, guaranteed-order place to compute derived data before
# any page/layout is rendered.
require "date"

class PublicationRankGenerator < Jekyll::Generator
  priority :high

  def generate(site)
    publications = site.data["publications"]
    return unless publications.is_a?(Array)

    publications.each_with_index do |pub, i|
      year = pub["year"].to_i
      month = pub["month"].to_i # blank/missing/invalid => 0, sorts first within its year
      tiebreak = 999 - (i % 1000) # earlier entries in the file win same-month ties
      pub["rank"] = (year * 100_000) + (month * 1_000) + tiebreak
      pub["month_name"] = Date::ABBR_MONTHNAMES[month] if month.between?(1, 12)
    end
  end
end
