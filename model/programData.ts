import {
  collection,
  doc,
  query,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";

export const getProgramRef = (userId: string, programId: string) => {
  const userRef = doc(database, "users", userId);
  const programCollRef = collection(userRef, "programs");
  const programRef = doc(programCollRef, programId);
  return programRef;
};

export const getProgramData = async (userId: string, programId: string) => {
  const programRef = getProgramRef(userId, programId);
  const snap = await getDoc(programRef);

  if (snap.exists()) {
    console.log("Document data:", snap.data());
    return snap.data();
  } else {
    console.log("No such document!");
  }
};

export const getNodesFromProgramRef = async (programRef: any) => {
  const q = query(collection(programRef, "nodes"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const getProgramsForUser = async (userId: string) => {
  const userRef = doc(database, "users", userId);
  const q = query(collection(userRef, "programs"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);
  return result;
};

export const setProgramDataFromRef = async (programRef: any, data: any) => {
  try {
    await setDoc(programRef, data, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const listenProgramData = (
  userId: string,
  programId: string,
  callback: (program: any) => void
) => {
  const programRef = getProgramRef(userId, programId);

  const unsubscribe = onSnapshot(programRef, (doc) => {
    callback(doc.data());
  });

  return unsubscribe;
};

export const createNamedProgram = async (userId: string, programId: string) => {
  const userRef = doc(database, "users", userId);
  const programsRef = collection(userRef, "programs");
  const programRef = doc(programsRef, programId);

  try {
    await setDoc(programRef, {
      createdAt: new Date(),
    });
    console.log("Program created with ID: ", programId);
    return programId;
  } catch (e) {
    console.error("Error adding new program: ", e);
  }
};
