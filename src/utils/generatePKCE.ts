import pkceChallenge from 'pkce-challenge';

const generatePKCE = async () => {
    const challenge = await pkceChallenge();

    return {
        codeVerifier: challenge.code_verifier,
        codeChallenge: challenge.code_challenge
    }
}

export default generatePKCE