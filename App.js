import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';



class Student {
    constructor(first, last, year){
        this.first = first;
        this.last = last;
        this.year = year%100;

        this.calendar = {}
    }

    makeCalendar(){
        const firstYear = this.year - 4;
        for (let i = firstYear; i < this.year; i++) {
            let fall = "F" + i.toString();
            let spring = "S" + (i+1).toString();

            this.calendar[fall] = []
            this.calendar[spring] = [];
        }
    }

    addClass(semester, courseName, courseCode, credit){
        let info = { courseName: courseName, courseCode: courseCode, credit: credit };


        let courseExists = false;

        // Loop through all semesters in the calendar
        for (const sem in this.calendar) {
            let courses = this.calendar[sem];

            // Check if the course already exists in the semester
            courseExists = courses.some(course => course.courseCode === courseCode);

            if (courseExists) {
                break;
            }
        }

        if (courseExists) {
            console.log("The course already exists in the calendar.");
        }
        else{
            this.calendar[semester].push(info);
        }
        
    }


    deleteClass(semester, courseName) {
        if (semester in this.calendar) {
            let courses = this.calendar[semester];
            let index = -1;
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].courseName === courseName) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.calendar[semester].splice(index, 1);
            } 
            else {
                console.log("Couldn't find the class");
            }
        } 
        else {
            console.log("Couldn't find the semester");
        }
    }

    // count whole credit
    countCredit(){
        let nCredit = 0;
        for (const sem in this.calendar){
            let courses = this.calendar[sem];
            for (let i = 0; i < courses.length; i++) {
                nCredit += courses[i].credit;
            }
        }
        return nCredit;
    }
}

// Initialize the student
let student = new Student("Michael", "Jackson", 2025);
student.makeCalendar();
// Freshman
student.addClass("F21", "Algebra Review", "MATH100", 3);
student.addClass("F21", "World Civilizations 1", "HIST111", 3);
student.addClass("F21", "Computer Science 1", "CMSC181", 3);
student.addClass("F21", "Biological Principles 1", "BIOL163", 3);

student.addClass("S22", "Applied Statistics", "MATH140", 4);
student.addClass("S22", "Writing Seminar", "ENGL200", 3);
student.addClass("S22", "Computer Science 2", "CMSC182", 3);
student.addClass("S22", "Genetics", "BIOL260", 4);
student.addClass("S22", "Survey of Criminology", "CRIM102", 3);

// Sophmore
student.addClass("F22", "Discrete Structures", "CMSC205", 3);
student.addClass("F22", "Computer Architecture", "CMSC280", 4);
student.addClass("F22", "Calculus 1", "MATH210", 4);
student.addClass("F22", "New Media", "DIGI220", 3);

student.addClass("S23", "British Literature", "ENGL260", 3);
student.addClass("S23", "Algorithms", "CMSC285", 3);
student.addClass("S23", "Development and Operations", "CMSC190", 3);
student.addClass("S23", "Web Application Development", "CMSC331", 3);
student.addClass("S23", "Writing Seminar", "ENGL200", 3);

// Junior
student.addClass("F23", "The Holocaust", "HIST242", 3);
student.addClass("F23", "Software Engineering", "CMSC360", 3);
student.addClass("F23", "Machine Learning", "CMSC410", 3);
student.addClass("F23", "Operating Systems", "CMSC432", 3);

student.addClass("S24", "User Interface Design", "CMSC351", 3);
student.addClass("S24", "Computer Security", "CMSC452", 3);
student.addClass("S24", "Computer Science Project", "CMSC291", 1);
student.addClass("S24", "Music Theory 2", "MUSC112", 3);

// Senior
student.addClass("F24", "Artificial Intelligence", "CMSC405", 3);
student.addClass("F24", "Capstone Proposal", "CMSC480", 1);
student.addClass("F24", "Database Management System", "CMSC321", 3);
student.addClass("F24", "Social Psycology", "PSYC111", 3);
student.addClass("F24", "Elementary Spanish", "SPAN110", 4);

student.addClass("S25", "Robotics", "CMSC325", 4);
student.addClass("S25", "Capstone", "CMSC481", 2);


export default function App() {
  return (
    // Make calender by Table
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell align="right">Class Code</TableCell>
            <TableCell align="right">Credit</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableCell>

        </TableCell>

        
  );
}


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
