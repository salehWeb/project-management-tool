import checkExpirationDateJwt from "../functions/checkExpirationDateJwt";
const unExpiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjY4MzYwMTU2LCJleHAiOjMzMjA0MzYwMTU2fQ.iApOI7SvHyZ1Z3zSaEpPjbXq8NKMRmQP_0aa37dEUDc"
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjY4MzYwMTU2LCJleHAiOjE2NjgzNjczNTZ9.k5bB2ZHvHNe20nfZUypIbXHWtJzEO36hOvqGdBZZohg";
import { render, screen, waitFor } from '@testing-library/react'
import UserComponent from './components/User'

it("Should return expired token", () => {
    expect(checkExpirationDateJwt(expiredToken)).toBe(true);
});

it("Should return unexpired token", () => {
    expect(checkExpirationDateJwt(unExpiredToken)).toBe(false);
})


it("test useGetUser Hook", async () => {
    const result = await waitFor(() => render(<UserComponent />));
    const h1 = result.container.querySelector('h1');
    result.container
    expect(h1).not.toBeNull();

});
