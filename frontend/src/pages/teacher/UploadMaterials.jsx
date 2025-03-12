"use client"

import { motion } from "framer-motion"

const UploadMaterials = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold mb-6">Upload Materials</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Use this page to upload course materials for your students.</p>
        {/* Add your material upload functionality here */}
      </div>
    </motion.div>
  )
}

export default UploadMaterials

