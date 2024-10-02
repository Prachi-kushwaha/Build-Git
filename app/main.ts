import * as fs from 'fs';

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
    Init = "init",
    Catfile = "cat-file"
}

switch (command) {
    case Commands.Init:
        // You can use print statements as follows for debugging, they'll be visible when running tests.
        console.log("Logs from your program will appear here!");

        // Uncomment this block to pass the first stage
        fs.mkdirSync(".git", { recursive: true });
        fs.mkdirSync(".git/objects", { recursive: true });
        fs.mkdirSync(".git/refs", { recursive: true });
        fs.writeFileSync(".git/HEAD", "ref: refs/heads/main\n");
        console.log("Initialized git directory");
        break;
    case Commands.Catfile:
        const [blobDir, blobFile] = [args[2].slice(0, 2), args[2].slice(2)];

        const blob = fs.readFileSync(`.git/objects/${blobDir}/${blobFile}`);

        const decompressedBlob = zlib.unzipSync(blob);

        const contentStartIndex = decompressedBlob.indexOf(0) + 1;

        const fileContent = decompressedBlob.slice(contentStartIndex).toString();

        process.stdout.write(fileContent);
        break;
    default:
        throw new Error(`Unknown command ${command}`);
}
