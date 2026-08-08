# Liquid's `sort` filter only sorts by one field, so it can't rank
# publications by year desc, then month desc, on its own. This computes a
# single numeric `rank` (year * 100 + month) and a display `month_name` on
# each entry in _data/publications.yml, so templates can just do:
#   site.data.publications | sort: "rank" | reverse
require "date"

Jekyll::Hooks.register :site, :pre_render do |site|
  publications = site.data["publications"]
  next unless publications.is_a?(Array)

  publications.each do |pub|
    year = pub["year"].to_i
    month = pub["month"].to_i # blank/missing/invalid => 0, sorts first within its year
    pub["rank"] = (year * 100) + month
    pub["month_name"] = Date::ABBR_MONTHNAMES[month] if month.between?(1, 12)
  end
end
