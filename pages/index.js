import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

const DUMMY_DATA = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Sofia 5, 123 Homa Bay",
    description: "Dessciption os our first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://www.epfl.ch/research/domains/exaf/wp-content/uploads/2021/06/MOI-UNIVERSITY-ADMINISTRATION-AND-SENATE-BUILDING.jpg",
    address: "Bombay 8,126 Kasarani",
    description: "Dessciption os our second meetup",
  },
];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of higly interractive react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://cassimHamisi:gqUhYEwV534OFae7@cluster0.poplgyq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetups) => ({
        id: meetups._id.toString(),
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        description: meetups.description,
      })),
    },
  };
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//       request: context.req,
//       response: context.res,
//     },
//   };
// }

export default HomePage;
