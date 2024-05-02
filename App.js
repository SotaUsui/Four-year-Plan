//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
//import { PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';


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

            this.calendar[fall] = [];
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
            return false;
        }
        else{
            this.calendar[semester].push(info);
            return true;
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

    // Initizilze value for add function
    const [selectedSemester, setSelectedSemester] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [credit, setCredit] = useState('');


    const semesterItems = [];       // stores the all semesters
    for (const semester in student.calendar) {
        semesterItems.push(<Picker.Item key={semester} label={semester} value={semester} />);
    }

    // Action for clicking add button
    const submitCourseAdd = () => {
        if (!selectedSemester || !courseName || !courseCode || !credit){
            Alert.alert('Please fil out all fields.');
            return;
        }
        
        
        let check = student.addClass(selectedSemester, courseName, courseCode, parseInt(credit))
        
        if(check){
            Alert.alert(`You successfully added ${courseName} to ${selectedSemester}.`);
        }
        else{
             Alert.alert(`${courseName} is already exist.`);
        }

        // clear all the form
        setSelectedSemester('');
        setCourseName('');
        setCourseCode('');
        setCredit('');
    };


    // Initialize value for delete function
    const [deleteSemester, setDeleteSemester] = useState(null);
    const [deleteClass, setDeleteClass] = useState(null);
    
    // Action for clicking delete button
    const handleDeleteClass = () => {
         console.log("deleteSemester:", deleteSemester);
         console.log("deleteClass:", deleteClass);

        if (!deleteSemester || !deleteClass) {
            Alert.alert('Please select a semester and a class to delete.');
            return;
        }   

        student.deleteClass(deleteSemester, deleteClass);
        Alert.alert(`Successfully deleted ${deleteClass} from ${deleteSemester}.`);

        // Clear the selected class after deletion
        setDeleteClass(null);
        setDeleteSemester(null);
    };

    // total credit
    const totalCredit = student.countCredit();

    return(

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

        <ScrollView style={styles.container}>
        {/* Display the calender */}
            {Object.keys(student.calendar).map(semester => {          {/* Map function split to each semester */}
            const classes = student.calendar[semester];               {/* classes is the cur semester */}
            return (
                <View key={semester} style={styles.semesterContainer}> 
                <Text style={styles.semesterTitle}>{semester}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.columnHeader}>Class Name</Text>
                        <Text style={styles.columnHeader}>Class Code</Text>
                        <Text style={styles.columnHeader}>Credit</Text>
                    </View>
                    {classes.map((course, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.cell}>{course.courseName}</Text>
                            <Text style={styles.cell}>{course.courseCode}</Text>
                            <Text style={styles.cell}>{course.credit}</Text>
                        </View>
                    ))}
                    </View>
                </View>
            );
             })}


        {/* total credit */}
        <Text style={styles.totalCreditText}>Total Credit: {totalCredit}</Text>


        {/* Add form */}
      <View style={styles.formContainer}>
        {/* semester */}
        <Text style={styles.label}>Semester:</Text>
        <Picker
            selectedValue={selectedSemester}
            onValueChange={(itemValue, itemIndex) => setSelectedSemester(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Select Semester" value="" />
            {semesterItems}
        </Picker>
        {/* course name */}
        <Text style={styles.label}>Course Name:</Text>
        <TextInput
            style={styles.input}
            value={courseName}
            onChangeText={text => setCourseName(text)}
        />

        {/* course code */}
        <Text style={styles.label}>Course Code:</Text>
        <TextInput
            style={styles.input}
            value={courseCode}
            onChangeText={text => setCourseCode(text)}
        />

        {/* credit */}
        <Text style={styles.label}>Credit:</Text>
        <Picker
          selectedValue={credit}
          onValueChange={(itemValue, itemIndex) => setCredit(itemValue)}
          style={styles.picker}
        >
        {/* options from 0 to 5 */}
          <Picker.Item label="0" value={0} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
        </Picker>

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={submitCourseAdd}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
       </View>

        
        {/* Delete form */}
      <View style={styles.deleteFormContainer}>
        {/* semester */}
        <Text style={styles.label}>Select Semester:</Text>
        <Picker
            selectedValue={deleteSemester}
            onValueChange={(itemValue, itemIndex) => setDeleteSemester(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Select Semester" value="" />
            {Object.keys(student.calendar).map((semester, index) => (
                <Picker.Item key={index} label={semester} value={semester} />
            ))}
        </Picker>

        {/* Class selection */}
        <Text style={styles.label}>Select Class:</Text>
        <Picker
            selectedValue={deleteClass}
            onValueChange={(itemValue, itemIndex) => setDeleteClass(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Select Class" value="" />
            {deleteSemester && student.calendar[deleteSemester].map((course, index) => (
                <Picker.Item key={index} label={course.courseName} value={course.courseName} />
            ))}
        </Picker>


        {/* Delete button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteClass}>
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
        
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    semesterContainer: {
        marginBottom: 20,
    },
    semesterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    columnHeader: {
        flex: 1,
        padding: 10,
        fontWeight: 'bold',
    },
    cell: {
        flex: 1,
        padding: 10,
    },
    formContainer: {
        backgroundColor: '#8bc1f0',     
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 3,
        borderColor: '#ebe37f',        // yellow
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        borderWidth: 3,
        borderColor: '#ebe37f',
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
    },
    buttonText: {           //Title??
        color: 'black', 
        fontSize: 16,
    },
    deleteFormContainer: {
        backgroundColor: '#ad92f7',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: '#ff6183',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
    },
    deleteButtonText: {
        color: 'black',
        fontSize: 16,
    },
    totalCreditText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },

});
