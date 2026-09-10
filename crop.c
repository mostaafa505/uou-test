#include <CoreFoundation/CoreFoundation.h>
#include <ApplicationServices/ApplicationServices.h>
#include <stdio.h>

int main(int argc, char** argv) {
    if (argc < 7) {
        printf("Usage: crop input.png output.png x y w h\n");
        return 1;
    }
    const char* input_path = argv[1];
    const char* output_path = argv[2];
    double x = atof(argv[3]);
    double y = atof(argv[4]);
    double w = atof(argv[5]);
    double h = atof(argv[6]);

    CFStringRef inStr = CFStringCreateWithCString(NULL, input_path, kCFStringEncodingUTF8);
    CFURLRef inUrl = CFURLCreateWithFileSystemPath(NULL, inStr, kCFURLPOSIXPathStyle, false);
    CGImageSourceRef src = CGImageSourceCreateWithURL(inUrl, NULL);
    if (!src) { printf("Failed to open source image\n"); return 1; }
    CGImageRef img = CGImageSourceCreateImageAtIndex(src, 0, NULL);
    
    CGRect rect = CGRectMake(x, y, w, h);
    CGImageRef cropped = CGImageCreateWithImageInRect(img, rect);
    if (!cropped) { printf("Failed to crop image\n"); return 1; }

    CFStringRef outStr = CFStringCreateWithCString(NULL, output_path, kCFStringEncodingUTF8);
    CFURLRef outUrl = CFURLCreateWithFileSystemPath(NULL, outStr, kCFURLPOSIXPathStyle, false);
    CGImageDestinationRef dest = CGImageDestinationCreateWithURL(outUrl, kUTTypePNG, 1, NULL);
    CGImageDestinationAddImage(dest, cropped, NULL);
    CGImageDestinationFinalize(dest);

    printf("Successfully cropped %s -> %s (%.0fx%.0f at %.0f,%.0f)\n", input_path, output_path, w, h, x, y);
    return 0;
}
