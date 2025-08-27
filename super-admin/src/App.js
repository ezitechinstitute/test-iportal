import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";
import { RemoteInterns } from "./pages/RemoteInterns";
import { InternProjects } from "./pages/InternProjects";
import { InternCompleted } from "./pages/InternCompleted";
import CompWithdraw from "./pages/CompWithdraw";
import Leave from "./pages/Leave";
import Balance from "./pages/Balance";
import Invoice from "./pages/Invoice";
import Accounts from "./pages/Accounts";
import Affiliates from "./pages/Affiliates";
import Feedback from "./pages/Feedback";
import intern from "./pages/InterviewInterns";
import InternTask from "./pages/InternTask";
import Knowledge from "./pages/Knowledge";
import Manager from "./pages/Manager";
import Setting from "./pages/Setting";
import Technology from "./pages/Technology";
import University from "./pages/University";
import Withdraw from "./pages/Withdraw";
import Intern from "./pages/InterviewInterns";
import Supervisor from "./pages/Supervisor";
import { AdminLogin } from "./pages/AdminLogin";
import { InternAccounts } from "./pages/InternAccounts";
import InterviewIntern from "./pages/InterviewInterns";
import ContactIntern from "./pages/ContactInterns";
import TestIntern from "./pages/TestInter";
import CompletedIntern from "./pages/CompletedIntern";
import ActiveIntern from "./pages/ActiveIntern";
import { IntProjectTasks, IntPrtojectTasks } from "./pages/IntProjectTasks";
import { UniversityLogin } from "./universties/pages/UniversityLogin";
import { UniversityDashboard } from "./universties/pages/UniversityDashboard";
import { UniversityInterns } from "./universties/pages/UniversityInterns";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ManagerHome />} />
          <Route exact path="/onsite-interns" element={<OnsiteInterns />} />
          <Route exact path="/intern-projects" element={<InternProjects />} />
          <Route
            exact
            path="/int-project-tasks"
            element={<IntProjectTasks />}
          />
          <Route exact path="/intern-task" element={<InternTask />} />
          <Route exact path="/intern-completed" element={<InternCompleted />} />
          <Route exact path="/leave" element={<Leave />} />
          <Route exact path="/balance" element={<Balance />} />
          <Route exact path="/invoice" element={<Invoice />} />
          <Route exact path="/accounts" element={<Accounts />} />
          <Route exact path="/withdraw" element={<Withdraw />} />
          <Route exact path="/manager" element={<Manager />} />
          <Route exact path="/Knowledgebase" element={<Knowledge />} />
          <Route exact path="/technology" element={<Technology />} />
          <Route exact path="/university" element={<University />} />
          <Route exact path="/affiliates" element={<Affiliates />} />
          <Route exact path="/setting" element={<Setting />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/int-interview" element={<InterviewIntern />} />
          <Route exact path="/int-contact" element={<ContactIntern />} />
          <Route exact path="/int-test" element={<TestIntern />} />
          <Route exact path="/int-completed" element={<CompletedIntern />} />
          <Route exact path="/int-active" element={<ActiveIntern />} />
          <Route exact path="/intern-accounts" element={<InternAccounts />} />
          <Route exact path="/Completed-Withdraw" element={<CompWithdraw />} />
          <Route exact path="/supervisor" element={<Supervisor />} />

          {/* Unversity Routes */}
          <Route exact path="/university-login" element={<UniversityLogin />} />
          <Route
            exact
            path="/university-dashboard"
            element={<UniversityDashboard />}
          />
          <Route
            exact
            path="/university-interns"
            element={<UniversityInterns />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
