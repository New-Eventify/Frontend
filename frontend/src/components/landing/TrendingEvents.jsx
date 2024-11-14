import SeeMore from "../SeeMore";
import EventCard from "./EventCard";

const TrendingEvents = () => {
  return (
    <div className="py-12">
      <div className="inner grid">
        <h2 className="text-4xl mb-3">Trending Events around the Country</h2>
        <div className="grid grid-cols-3 gap-4">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
        <SeeMore />
      </div>
    </div>
  );
};

export default TrendingEvents;
