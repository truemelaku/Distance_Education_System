"use client"

import { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { PlusCircle, Video, FileText, Pencil, Trash2, Play, Download } from "lucide-react"
import Modal from "./Modal"

const CourseDetail = () => {
  const { courseId } = useParams()
  const [courseTitle, setCourseTitle] = useState("OBJECT ORIENTED PROGRAMMING (CSE1103)")
  const [courseDescription, setCourseDescription] = useState(
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
  )

  // State for videos and files
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Basic Java Concepts - By Adil Mohammed",
      uploadedDate: "Dec 19, 2020",
    },
    {
      id: 2,
      title: "What is OOP (Object Oriented Programming)",
      uploadedDate: "Dec 19, 2020",
    },
  ])

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Chapter 1 - Introduction.pdf",
      uploadedDate: "Dec 19, 2020",
      updatedDate: "Dec 20, 2020",
      downloads: 45,
    },
  ])

  // State for modals
  const [fileUploadModal, setFileUploadModal] = useState(false)
  const [videoUploadModal, setVideoUploadModal] = useState(false)
  const [editVideoModal, setEditVideoModal] = useState(false)
  const [editFileModal, setEditFileModal] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [quizModal, setQuizModal] = useState(false)
  const [videoPlayerModal, setVideoPlayerModal] = useState(false)

  // State for form inputs
  const [newFileName, setNewFileName] = useState("")
  const [newVideoTitle, setNewVideoTitle] = useState("")
  const [currentItem, setCurrentItem] = useState(null)
  const [itemType, setItemType] = useState("")

  // Refs for file inputs
  const fileInputRef = useRef(null)
  const videoInputRef = useRef(null)

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault()
    const file = fileInputRef.current.files[0]
    if (file) {
      const newFile = {
        id: files.length + 1,
        name: newFileName || file.name,
        uploadedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        updatedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        downloads: 0,
      }
      setFiles([...files, newFile])
      setFileUploadModal(false)
      setNewFileName("")
    }
  }

  // Handle video upload
  const handleVideoUpload = (e) => {
    e.preventDefault()
    const video = videoInputRef.current.files[0]
    if (video) {
      const newVideo = {
        id: videos.length + 1,
        title: newVideoTitle || video.name,
        uploadedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }
      setVideos([...videos, newVideo])
      setVideoUploadModal(false)
      setNewVideoTitle("")
    }
  }

  // Handle edit video
  const handleEditVideo = (e) => {
    e.preventDefault()
    if (currentItem) {
      const updatedVideos = videos.map((video) =>
        video.id === currentItem.id ? { ...video, title: newVideoTitle } : video,
      )
      setVideos(updatedVideos)
      setEditVideoModal(false)
      setCurrentItem(null)
      setNewVideoTitle("")
    }
  }

  // Handle edit file
  const handleEditFile = (e) => {
    e.preventDefault()
    if (currentItem) {
      const updatedFiles = files.map((file) =>
        file.id === currentItem.id
          ? {
              ...file,
              name: newFileName,
              updatedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            }
          : file,
      )
      setFiles(updatedFiles)
      setEditFileModal(false)
      setCurrentItem(null)
      setNewFileName("")
    }
  }

  // Handle delete item
  const handleDelete = () => {
    if (currentItem && itemType) {
      if (itemType === "video") {
        setVideos(videos.filter((video) => video.id !== currentItem.id))
      } else if (itemType === "file") {
        setFiles(files.filter((file) => file.id !== currentItem.id))
      }
      setDeleteConfirmModal(false)
      setCurrentItem(null)
      setItemType("")
    }
  }

  // Open edit modal for video
  const openEditVideoModal = (video) => {
    setCurrentItem(video)
    setNewVideoTitle(video.title)
    setEditVideoModal(true)
  }

  // Open edit modal for file
  const openEditFileModal = (file) => {
    setCurrentItem(file)
    setNewFileName(file.name)
    setEditFileModal(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (item, type) => {
    setCurrentItem(item)
    setItemType(type)
    setDeleteConfirmModal(true)
  }

  // Open video player modal
  const openVideoPlayer = (video) => {
    setCurrentItem(video)
    setVideoPlayerModal(true)
  }

  // Handle file download
  const handleDownload = (file) => {
    // In a real app, this would trigger a download
    alert(`Downloading ${file.name}`)

    // Update download count
    const updatedFiles = files.map((f) => (f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f))
    setFiles(updatedFiles)
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-200 p-3 mb-4 rounded">
        <span className="text-gray-700">Course Details - {courseId}</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-700">{courseTitle}</h2>
          <button
            onClick={() => setQuizModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            Take a Quiz
          </button>
        </div>

        <p className="text-gray-600 mb-8">{courseDescription}</p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFileUploadModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            UPLOAD NEW FILE
          </button>
          <button
            onClick={() => setVideoUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            UPLOAD NEW VIDEO
          </button>
        </div>

        {/* Video Tutorials Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-400 to-blue-800 text-white p-4 rounded-t-lg">
            <h3 className="text-xl font-medium">Video Tutorials</h3>
          </div>
          <div className="overflow-x-auto border rounded-b-lg">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Video Title</th>
                  <th className="py-3 px-4 text-left">Uploaded Date</th>
                  <th className="py-3 px-4 text-left">Get Started</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr key={video.id} className="border-t">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-blue-500" />
                        {video.title}
                      </div>
                    </td>
                    <td className="py-3 px-4">{video.uploadedDate}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => openVideoPlayer(video)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
                      >
                        Get Started
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditVideoModal(video)} className="text-blue-500 hover:text-blue-600">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(video, "video")}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documentations Section */}
        <div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-800 text-white p-4 rounded-t-lg">
            <h3 className="text-xl font-medium">Documentations</h3>
          </div>
          <div className="overflow-x-auto border rounded-b-lg">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">File name</th>
                  <th className="py-3 px-4 text-left">Uploaded Date</th>
                  <th className="py-3 px-4 text-left">Updated Date</th>
                  <th className="py-3 px-4 text-left">Downloads</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={file.id} className="border-t">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        {file.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">{file.uploadedDate}</td>
                    <td className="py-3 px-4">{file.updatedDate}</td>
                    <td className="py-3 px-4">{file.downloads}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(file)}
                          className="text-green-500 hover:text-green-600"
                          title="Download"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openEditFileModal(file)}
                          className="text-blue-500 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(file, "file")}
                          className="text-red-500 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      <Modal isOpen={fileUploadModal} onClose={() => setFileUploadModal(false)} title="Upload New File">
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
            <input
              type="file"
              ref={fileInputRef}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Name (Optional)</label>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter custom file name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setFileUploadModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Upload
            </button>
          </div>
        </form>
      </Modal>

      {/* Video Upload Modal */}
      <Modal isOpen={videoUploadModal} onClose={() => setVideoUploadModal(false)} title="Upload New Video">
        <form onSubmit={handleVideoUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
            <input
              type="file"
              ref={videoInputRef}
              accept="video/*"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
            <input
              type="text"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setVideoUploadModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Upload
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Video Modal */}
      <Modal isOpen={editVideoModal} onClose={() => setEditVideoModal(false)} title="Edit Video">
        <form onSubmit={handleEditVideo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
            <input
              type="text"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditVideoModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit File Modal */}
      <Modal isOpen={editFileModal} onClose={() => setEditFileModal(false)} title="Edit File">
        <form onSubmit={handleEditFile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditFileModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmModal} onClose={() => setDeleteConfirmModal(false)} title="Confirm Delete">
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this {itemType}? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDeleteConfirmModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Quiz Modal */}
      <Modal isOpen={quizModal} onClose={() => setQuizModal(false)} title="Take a Quiz">
        <div className="space-y-4">
          <p className="text-gray-700">Select a quiz to take for this course:</p>
          <div className="space-y-2">
            <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">Midterm Quiz</h4>
              <p className="text-sm text-gray-500">10 questions • 20 minutes</p>
            </div>
            <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">Final Quiz</h4>
              <p className="text-sm text-gray-500">20 questions • 45 minutes</p>
            </div>
            <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">Chapter 1 Quiz</h4>
              <p className="text-sm text-gray-500">5 questions • 10 minutes</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setQuizModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Video Player Modal */}
      <Modal
        isOpen={videoPlayerModal}
        onClose={() => setVideoPlayerModal(false)}
        title={currentItem?.title || "Video Player"}
      >
        <div className="space-y-4">
          <div className="bg-black aspect-video rounded flex items-center justify-center">
            <div className="text-white flex flex-col items-center">
              <Play className="w-16 h-16" />
              <p className="mt-2">Video player would appear here</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setVideoPlayerModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CourseDetail

