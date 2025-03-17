"use client"

import React from "react"

const SubmitScores = ({ setTitle }) => {
  React.useEffect(() => {
    setTitle("Submit Scores")
  }, [setTitle])

  return <div>Submit Scores Component</div>
}

export default SubmitScores

