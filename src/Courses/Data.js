import * as firebase from "firebase/app"
import "firebase/firestore";

export const addCourse = (data) => {
  const collection = firebase.firestore().collection('courses');
  return collection.add(data);
}

export const getAllCourses = () => {
  const query = firebase.firestore()
          .collection('courses')
          .orderBy('avgRating', 'desc')
          .limit(50)

  return query;
}

export const getDocumentsInQuery = (query, renderer) => {
  return query.onSnapshot((snapshot) => {
    if (!snapshot.size) return renderer.empty();

    snapshot.docChanges().forEach((change) => {
      if (change.type === 'removed') {
        renderer.remove(change.doc)
      } else {
        renderer.display(change.doc)
      }
    });
  });
}

export const getCourse = (id) => {
  return firebase.firestore().collection('courses').doc(id).get();
}

export const getFilteredCourses = (filters) => {
  let query = firebase.firestore().collection('courses');

  if (filters.semester !== 'Any') {
    query = query.where('semester', '==', filters.semester);
  }
/*
  if (filters.category !== 'Any') {
    query = query.where('semester', '==', filters.category);
  }

  if (filters.price !== 'Any') {
    query = query.where('semester', '==', filters.price.length);
  }
*/
  if (filters.sort === 'Rating') {
    query = query.orderBy('avgRating', 'desc');
  } else if (filters.sort === 'Reviews') {
    query = query.orderBy('numRatings', 'desc');
  }
  return query;
}


/**
 * Need to make two new addRating functions. In total will have three.
 * one for each grade: pract, diff, load
 * Return r1, r2 and r3 for each rating. 
 * showcase each separate rating in courses/:id
 * calc avg from those three numbers for overall score
 * 
 */

export const addRating = (courseID, rating) => {
  const collection = firebase.firestore().collection('courses');
  const document = collection.doc(courseID);
  const newRatingDocument = document.collection('ratings').doc();

  return firebase.firestore().runTransaction(function(transaction) {
    return transaction.get(document).then(function(doc) {
      const data = doc.data();

      const newAverage =
            (data.numRating * data.avgRating + rating.rating) /
            (data.numRating + 1);

      transaction.update(document, {
        numRatings: data.numRating + 1,
        avgRating: newAverage
      });
      return transaction.set(newRatingDocument, rating);
    });
  });
}


/**
export const addRatingPracticality = (courseID, ratingPractical) => {
  const collection = firebase.firestore().collection('courses');
  const document = collection.doc(courseID);
  const newRatingDocument = document.collection('ratings').doc();

  return firebase.firestore().runTransaction(function(transaction) {
    return transaction.get(document).then(function(doc) {
      const data = doc.data();

      const newAverage =
            (data.numRating * data.avgRating + rating.rating) /
            (data.numRating + 1);

      transaction.update(document, {
        numRatings: data.numRating + 1,
        avgRating: newAverage
      });
      return transaction.set(newRatingDocument, rating);
    });
  });
}



export const addRatingLoad = (courseID, rating) => {
  const collection = firebase.firestore().collection('courses');
  const document = collection.doc(courseID);
  const newRatingDocument = document.collection('ratings').doc();

  return firebase.firestore().runTransaction(function(transaction) {
    return transaction.get(document).then(function(doc) {
      const data = doc.data();

      const newAverage =
            (data.numRatingLoad * data.avgRatingLoad + rating.ratingLoad) /
            (data.numRatingLoad + 1);

      transaction.update(document, {
        numRatings: data.numRatingLoad + 1,
        avgRating: newAverage
      });
      return transaction.set(newRatingDocument, rating);
    });
  });
}

*/





export const getRating = (id) => {
  return firebase.firestore().collection('courses').doc(id).collection('ratings').orderBy('timestamp', 'desc');
}


/*
export const getRatingPracticality = (id) => {
  return firebase.firestore().collection('courses').doc(id).collection('ratings').orderBy('timestamp', 'desc');
}


export const getRatingLoad = (id) => {
  return firebase.firestore().collection('courses').doc(id).collection('ratings').orderBy('timestamp', 'desc');
}
*/
