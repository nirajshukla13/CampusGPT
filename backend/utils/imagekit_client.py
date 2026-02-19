import os
from imagekitio import ImageKit

imagekit = ImageKit(
    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY")
)

URL_ENDPOINT = os.environ.get("IMAGEKIT_URL_ENDPOINT")

def upload_document(
    file_path: str,
    folder: str = "campusgpt/documents"
) -> dict:

    response = imagekit.files.upload(
        file=file_path,
        file_name=file_path.name,
        folder=folder,
        tags=["academic"]
    )
    print(f"File ID: {response.file_id}")
    print(f"URL: {response.url}")

    return {
        "file_id": response.file_id,
        "name": response.name,
        "url": response.url,
        "file_path": response.file_path
    }
