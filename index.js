const buttonSubmitElement = document.getElementById("buttonSubmit");

const nameInputElement = document.getElementById("nameInput");
const messageNameInputNullElement = document.getElementById("messageInputNameNull");

const phoneInputElement = document.getElementById("phoneInput");
const messagePhoneInputNullElement = document.getElementById("messageInputPhoneNull");

const dateOfBirthInputElement = document.getElementById("dateOfBirthInput");
const messageDateOfBirthInputNullElement = document.getElementById("messageInputDateOfBirthNull");
const messageDateOfBirthInputFutureElement = document.getElementById("messageInputDateOfBirthFuture");

const appointmentDateInputElement = document.getElementById("appointmentDateInput");
const messageInputAppointmentDateNullElement = document.getElementById("messageInputAppointmentDateNull");
const messageInputAppointmentPastDateElement = document.getElementById("messageInputAppointmentDatePast");
const messageInputAppointmentThresholdDateElement = document.getElementById("messageInputAppointmentDateThreshold");
const messageInputAppointmentDateOvertimeElement = document.getElementById("messageInputAppointmentDateOvertime");

const appointmentTimeInputElement = document.getElementById("appointmentTimeInput");

const regexName = /[^ a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]/g;
const regexPhone = /[^0-9]/g;

const listAppointmentTime = ["08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"];

const currentYear = new Date().getFullYear();
const currentMounth = new Date().getMonth();
const currentDate = new Date().getDate();
const currentHours = new Date().getHours();
const currentTimestamp = new Date(currentYear + "-" +currentMounth +"-"+ currentDate).getTime();

nameInputElement.addEventListener("blur", validateName);
nameInputElement.addEventListener("keyup", removeMessageName);

phoneInputElement.addEventListener("blur", validatePhone);
phoneInputElement.addEventListener("keyup", removeMessagePhone);

dateOfBirthInputElement.addEventListener("blur", validateDateOfBirth);
dateOfBirthInputElement.addEventListener("change", removeMessageDateOfBirth);

appointmentDateInputElement.addEventListener("blur", validateAppointmentDate);
appointmentDateInputElement.addEventListener("change", removeMessageAppointmentDate);

buttonSubmitElement.addEventListener("click", validateData);

// validate name
function validateName(){
    if (nameInputElement.value.trim() == "") {
        buttonSubmitElement.disabled = true;
        messageNameInputNullElement.classList.remove("d-none")
        nameInputElement.value = null;
        nameInputElement.focus();
        return false;
    }
    return true;
}
function removeMessageName() {
    nameInputElement.value = nameInputElement.value.replace(regexName, "");
    buttonSubmitElement.disabled = false;
    messageNameInputNullElement.classList.add("d-none")
}

// validate phone
function validatePhone(){
    if (phoneInputElement.value.trim() == "") {
        buttonSubmitElement.disabled = true;
        messagePhoneInputNullElement.classList.remove("d-none")
        phoneInputElement.value = null;
        phoneInputElement.focus();
        return false;
    }
    return true;
}
function removeMessagePhone() {
    phoneInputElement.value = phoneInputElement.value.replace(regexPhone, "");
    buttonSubmitElement.disabled = false;
    messagePhoneInputNullElement.classList.add("d-none")
}

// validate dateOfBirth
function validateDateOfBirth(){
    let birthday = new Date(dateOfBirthInputElement.value);
    let birthdayTimestamp =  new Date(birthday.getFullYear() + "-" +birthday.getMonth() +"-"+ birthday.getDate()).getTime();

    if (dateOfBirthInputElement.value.trim() == "") {
        buttonSubmitElement.disabled = true;
        messageDateOfBirthInputNullElement.classList.remove("d-none")
        dateOfBirthInputElement.focus();
        return false;
    }
    if (birthdayTimestamp - currentTimestamp > -1) {
        buttonSubmitElement.disabled = true;
        messageDateOfBirthInputFutureElement.classList.remove("d-none")
        dateOfBirthInputElement.focus();
        return false;
    }
    return true;
}
function removeMessageDateOfBirth() {
    buttonSubmitElement.disabled = false;
    messageDateOfBirthInputNullElement.classList.add("d-none")
    messageDateOfBirthInputFutureElement.classList.add("d-none")
}

// validate AppointmentDate
function validateAppointmentDate(){
    let appointmentDate = new Date(appointmentDateInputElement.value);
    let appointmentDateTimestamp =  new Date(appointmentDate.getFullYear() + "-" +appointmentDate.getMonth() +"-"+ appointmentDate.getDate()).getTime();

    if (appointmentDateInputElement.value.trim() == "") {
        buttonSubmitElement.disabled = true;
        messageInputAppointmentDateNullElement.classList.remove("d-none")
        appointmentDateInputElement.focus();
        genDefaultAppointmentTime();
        return false;
    }
    if (appointmentDateTimestamp < currentTimestamp) {
        buttonSubmitElement.disabled = true;
        messageInputAppointmentPastDateElement.classList.remove("d-none")
        appointmentDateInputElement.focus();
        genDefaultAppointmentTime();
        return false;
    }
    if (appointmentDate.getMonth() >= currentMounth+2 && appointmentDate.getDate() - currentDate > 0) {
        buttonSubmitElement.disabled = true;
        messageInputAppointmentThresholdDateElement.classList.remove("d-none")
        appointmentDateInputElement.focus();
        genDefaultAppointmentTime();
        return false;
    }
    if (appointmentDateTimestamp == currentTimestamp && currentHours > 16) {
        buttonSubmitElement.disabled = true;
        messageInputAppointmentDateOvertimeElement.classList.remove("d-none")
        appointmentDateInputElement.focus();
        genDefaultAppointmentTime();
        return false;
    }
    genOptionAppointmentTime();
    return true;
}
function removeMessageAppointmentDate() {
    buttonSubmitElement.disabled = false;
    messageInputAppointmentDateNullElement.classList.add("d-none")
    messageInputAppointmentPastDateElement.classList.add("d-none")
    messageInputAppointmentThresholdDateElement.classList.add("d-none")
}


function genDefaultAppointmentTime() {
    if (document.getElementById("appointmentTimeInput") != null) {
        document.getElementById("appointmentTimeInput").remove();
    }

    let select = document.createElement("select");
    select.setAttribute("id", "appointmentTimeInput");
    select.setAttribute("name", "appointmentTimeInput");
    select.setAttribute("class", "ms-3 mt-1");

    let option = document.createElement("option");
    option.text = "Vui lòng chọn ngày hẹn";

    document.getElementById("selectAppointmentTime").appendChild(select);
    document.getElementById("appointmentTimeInput").add(option);
};
genDefaultAppointmentTime();

function genOptionAppointmentTime() {
    if (document.getElementById("appointmentTimeInput") != null) {
        document.getElementById("appointmentTimeInput").remove();
    }

    let select = document.createElement("select");
    select.setAttribute("id", "appointmentTimeInput");
    select.setAttribute("name", "appointmentTimeInput");
    select.setAttribute("class", "ms-3 mt-1");

    document.getElementById("selectAppointmentTime").appendChild(select);

    for (let index = 0; index < listAppointmentTime.length; index++) {
        let option = document.createElement("option");
        option.setAttribute("value", listAppointmentTime[index]);
        option.text = listAppointmentTime[index];
        document.getElementById("appointmentTimeInput").add(option);
    }
}

function validateData() {
    if (!validateName()) {
        return false;
    }
    if (!validatePhone()) {
        return false;
    }
    if (!validateDateOfBirth()) {
        return false;
    }
    if (!validateAppointmentDate()) {
        return false;
    }

    let dataForm  = {
        name: nameInputElement.value,
        phone: phoneInputElement.value,
        gender: document.querySelector('input[name="genderInput"]:checked').value,
        dateOfBirth: dateOfBirthInputElement.value,
        appointmentDate: appointmentDateInputElement.value,
        appointmentTime: document.getElementById("appointmentTimeInput").value,
    }
    
    localStorage.setItem('submit', JSON.stringify(dataForm));

    nameInputElement.value = null;
    phoneInputElement.value = null;
    dateOfBirthInputElement.value = null;
    appointmentDateInputElement.value = null;
    genDefaultAppointmentTime();
}
