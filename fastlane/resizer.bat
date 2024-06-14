@echo off
setlocal enabledelayedexpansion

mode con:cols=50 lines=25
color 0A

:: Use the directory of the .bat file as the source directory
set src_dir=%~dp0
set dest_dir=%~dp0..\android\app\src\main\res

:: Ensure destination directories exist
mkdir "%dest_dir%\drawable"
mkdir "%dest_dir%\mipmap-xxxhdpi"
mkdir "%dest_dir%\mipmap-xxhdpi"
mkdir "%dest_dir%\mipmap-xhdpi"
mkdir "%dest_dir%\mipmap-hdpi"
mkdir "%dest_dir%\mipmap-mdpi"

:: Resize splashscreen_image.png to 1242x1242
magick "%src_dir%splashscreen_image.png" -resize 1242x1242 "%dest_dir%\drawable\splashscreen_image.png"
echo \drawable\splashscreen_image.png

:: Resize ic_launcher_round.png and ic_launcher.png to various sizes
for %%S in (192 144 96 72 48) do (
    if %%S equ 192 (
        set "subdir=mipmap-xxxhdpi"
    ) else if %%S equ 144 (
        set "subdir=mipmap-xxhdpi"
    ) else if %%S equ 96 (
        set "subdir=mipmap-xhdpi"
    ) else if %%S equ 72 (
        set "subdir=mipmap-hdpi"
    ) else if %%S equ 48 (
        set "subdir=mipmap-mdpi"
    )
    
    magick "%src_dir%ic_launcher_round.png" -resize %%Sx%%S -filter Lanczos -define filter:blur=0.75 "%dest_dir%\!subdir!\ic_launcher_round.png"
    magick "%src_dir%ic_launcher.png" -resize %%Sx%%S -filter Lanczos -define filter:blur=0.75 "%dest_dir%\!subdir!\ic_launcher.png"
    echo \!subdir!\ic_launcher_round.png
    echo \!subdir!\ic_launcher.png
)

echo All images have been resized successfully!
pause
exit
