import { collection, getDocs, where, query, QueryConstraint, orderBy } from 'firebase/firestore';
import { db } from '../firebase/FirebaseApp';
import { SavedTime } from '../types/models/SavedTime';

const savedTimesRef = collection(db, 'savedtimes');

async function getSavedTimes(uid: string, ...queryConstraints: QueryConstraint[]): Promise<SavedTime[]> {
    try {
        const snapshots = await getDocs(
            query(savedTimesRef, where('uid', '==', uid), orderBy('startTime', 'desc'), ...queryConstraints),
        );
        const savedTimes = snapshots.docs.map((snapshot) => {
            const data = snapshot.data();
            return {
                ...data,
                startTime: data.startTime.toDate(),
                endTime: data.endTime.toDate(),
                id: snapshot.id,
            } as SavedTime;
        });
        return savedTimes;
    } catch (err) {
        console.error(err);
    }
    return [];
}

export { getSavedTimes };
