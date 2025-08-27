const cron = require("node-cron");
const { DateTime } = require("luxon"); // Install luxon for better date handling
const {
  TaskDayIncrement,
  ProjectTaskDayIncrement,
} = require("../intern/intern-projects-controller");
const { ProjectDayIncrement } = require("../supervisor/sup-interns-controller");
const { MarkAbsentAuto } = require("../intern/internAttendance-controller");
const { DeleteCodeAtMidNight } = require("./Verify-Email");

const isMidnightInPakistan = () => {
  const nowInPakistan = DateTime.now().setZone("Asia/Karachi");
  const hour = nowInPakistan.hour;
  const minute = nowInPakistan.minute;
  const seconds = nowInPakistan.second;

  return hour === 23 && minute === 59 && seconds === 59; // Midnight check
};

// Function to check if it's midnight in Pakistan (Asia/Karachi)
const isBeforeMidnightInPakistan = () => {
  const nowInPakistan = DateTime.now().setZone("Asia/Karachi");
  const hour = nowInPakistan.hour;
  const minute = nowInPakistan.minute;
  const seconds = nowInPakistan.second;

  return hour === 23 && minute === 55 && seconds === 59; // Midnight check
};

const RunJob = () => {
  cron.schedule("* * * * * *", () => {
    // ProjectDayIncrement();
    // TaskDayIncrement();
    if (isMidnightInPakistan()) {
      TaskDayIncrement();
      ProjectDayIncrement();
      ProjectTaskDayIncrement();
      DeleteCodeAtMidNight();
    }

    if (isBeforeMidnightInPakistan()) {
      MarkAbsentAuto();
    }
  });
};

module.exports = RunJob;
