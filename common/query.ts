export const GET_WORKOUTS = `query GetWorkouts($limit: Int!, $offset: Int!) {
    getWorkouts(limit: $limit, offset: $offset) {
      id
      title
      details
      date
    }
  }
`;

export const ADD_WORKOUT = `mutation CreateWorkout($title:String!,$date:String!,$details:String!) {
    createWorkout(data: {title: $title, date:$date, details: $details}) {
      id
      title
      details
      date
    }
  }`;

export const UPDATE_WORKOUT = `mutation MyMutation($title: String!, $date: String!, $details: String!, $id: String!) {
  updateWorkout(data: {title: $title, details: $details, date: $date, id:$id}) {
    id
    title
    date
    details
  }
}`;
