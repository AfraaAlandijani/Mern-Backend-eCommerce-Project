import fs from 'fs/promises'

export const deleteImage = async (imagePath:string) => {
  try {
      await fs.unlink(imagePath)
      console.log("image is delete frome server")
  } catch (error) {
    throw error
  }
}
