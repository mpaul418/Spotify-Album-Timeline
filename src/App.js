import { Chrono } from "react-chrono";
import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
} from '@merc/react-timeline';

function App() {

  // const items = [{
  //   title: "May 1940",
  //   cardTitle: "Dunkirk",
  //   url: "http://www.history.com",
  //   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  //   cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
  // },
  // {
  //   title: "June 1940",
  //   cardTitle: "Dunkirk",
  //   url: "http://www.history.com",
  //   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  //   cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
  // },
  // {
  //   title: "May 1942",
  //   cardTitle: "Dunkirk",
  //   url: "http://www.history.com",
  //   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  //   cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
  // }];

  return (
    <div className="App">
      {/* <Chrono items={items} /> */}
      <Timeline opts={{ layout: 'inline-evts' }}>
        <Events>
          <TextEvent date="1/1/19" text="**Markdown** is *supported*" />

          <TextEvent
            date="1/2/19"
            text="Events alternate by default (given enough space in the browser)"
          />

          <TextEvent
            date="June 2019"
            text="June 2019"
          >
            <UrlButton href="https://unsplash.com/search/photos/undersea">
              View more undersea photos
            </UrlButton>
            <Timeline>
              <Events>
                <ImageEvent
                  date="4/13/19"
                  text="You can embed images..."
                  src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                  alt="jellyfish swimming"
                  credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                />
                <ImageEvent
                  date="4/14/19"
                  text="You can embed images..."
                  src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                  alt="jellyfish swimming"
                  credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                />
                <ImageEvent
                  date="4/14/19"
                  text="You can embed images..."
                  src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                  alt="jellyfish swimming"
                  credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                />
                <ImageEvent
                  date="4/14/19"
                  text="You can embed images..."
                  src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                  alt="jellyfish swimming"
                  credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                />
                <ImageEvent
                  date="4/14/19"
                  text="You can embed images..."
                  src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                  alt="jellyfish swimming"
                  credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                />
                <ImageEvent
                  date="4/14/19"
                  text="You can embed images..."
                  src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
                  alt="jellyfish swimming"
                  credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
                />
              </Events>
            </Timeline>
          </TextEvent>

          <YouTubeEvent
            date="6/18/19"
            id="6UnRHtwHGSE"
            name="General Tso's Chicken recipe"
            text="... and YouTube videos!"
          />

          <YouTubeEvent
            date="1/19/19"
            id="6UnRHtwHGSE"
            name="General Tso's Chicken recipe"
            text="... and YouTube videos!"
          />
        </Events>
      </Timeline>
    </div >
  );
}

export default App;
