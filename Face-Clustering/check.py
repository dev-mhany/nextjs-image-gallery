import dlib
import subprocess
import os

def check_cuda():
    try:
        nvcc_version = subprocess.check_output("nvcc --version", shell=True).decode()
        print("CUDA Toolkit version:")
        print(nvcc_version)
    except subprocess.CalledProcessError as e:
        print("CUDA Toolkit is not installed or not configured properly.")

def check_cudnn(cuda_path):
    # Typical cuDNN related files
    cudnn_files = [
        "include/cudnn.h",
        "lib/x64/cudnn.lib"
    ]
    is_cudnn_installed = all(os.path.exists(os.path.join(cuda_path, f)) for f in cudnn_files)
    
    if is_cudnn_installed:
        print("cuDNN appears to be installed correctly.")
    else:
        print("cuDNN is not installed or not configured properly.")

def check_gpu_driver():
    try:
        gpu_info = subprocess.check_output("wmic path win32_VideoController get DriverVersion", shell=True).decode()
        print("GPU Driver version:")
        print(gpu_info)
    except subprocess.CalledProcessError as e:
        print("Unable to retrieve GPU driver version.")

if __name__ == "__main__":
    print("Checking CUDA installation...")
    check_cuda()
    
    cuda_path = os.getenv("CUDA_PATH", "C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v12.4") # Example path, adjust as necessary
    print("Checking cuDNN installation...")
    check_cudnn(cuda_path)
    
    print("Checking GPU driver version...")
    check_gpu_driver()

print(dlib.DLIB_USE_CUDA)