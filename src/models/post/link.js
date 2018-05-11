const linkTypeDef = `
    extend type Post {
        hashtag: Hashtag
        user: User
        likedBy: [User]
    }

`;

export default linkTypeDef;
