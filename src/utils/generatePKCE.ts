import pkceChallenge from 'pkce-challenge';

export const generatePKCE = async () => {
    const challenge = await pkceChallenge();

    return {
        codeVerifier: challenge.code_verifier,
        codeChallenge: challenge.code_challenge
    }
}

