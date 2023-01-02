import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  console.log(props.meetups);
  return (
    <Fragment>
      <Head>
        <title>{props.meetups.title}</title>
        <meta name="description" content={props.meetups.description} />
      </Head>
      <MeetupDetail
        title={props.meetups.title}
        description={props.meetups.description}
        image={props.meetups.image}
        address={props.meetups.address}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://cassimHamisi:gqUhYEwV534OFae7@cluster0.poplgyq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data from an API
  const meetupid = context.params.meetupid;
  const client = await MongoClient.connect(
    "mongodb+srv://cassimHamisi:gqUhYEwV534OFae7@cluster0.poplgyq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupid),
  });

  client.close();
  return {
    props: {
      meetups: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
