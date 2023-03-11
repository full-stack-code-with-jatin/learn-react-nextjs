class Configuration {
    hostUrl: string;
    constructor() {
        this.hostUrl = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000/'
    }
}

const configuration = new Configuration();

export { configuration };