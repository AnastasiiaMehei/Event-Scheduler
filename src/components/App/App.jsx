
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import EventPage from "../../pages/EventPage/EventPage";

function App() {

  return (
    <>
    <Layout>
    <Suspense fallback={null}>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/events" element={<EventPage />} />

    </Routes>

    </Suspense>

    </Layout>


        </>
  )
}

export default App
