import { Button, Card, Col, Container, Grid, Input, Row, Text } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import moment from "moment";

const Codeforces = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userStatus, setUserStatus] = useState();
  const [username, setusername] = useState();

  const getCodeforcesUser = () => {
    setLoading(true);
    const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`;
    const userStatusApi = `https://codeforces.com/api/user.status?handle=${username}&count=5`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((user) => {
        setUserDetails(user.result[0]);
        setLoading(false);
      });
    setLoading(true);
    fetch(userStatusApi)
      .then((res) => res.json())
      .then((userStatus) => {
        const solvedQuestion = userStatus.result.filter(
          (sol) => sol.verdict === "OK"
        );
        setUserStatus(solvedQuestion);
        setLoading(false);
      });
  };

  if (loading) return "Loading...";

  return (
    <Container display="flex" justify="center" alignItems="center">
      <h1>Codeforces</h1>
      <Row justify="center" align="center" css={{ flexDirection: "row", gap: "2rem", py: "1rem" }}>
        <Input
          labelPlaceholder="codeforcesUsername"
          type="text"
          name="codeforcesUsername"
          id="codeforcesUsername"
          onChange={(e) => setusername(e.target.value)}
        />
        <Button onClick={() => getCodeforcesUser()}>Search</Button>
      </Row>
      <Grid gap={2} css={{ width: "100%" }}>
        {userDetails && userStatus && (
          <>
            <Row gap={2} alignitems="center" justify="center">
              <Text size="1.2rem" b>Username: {userDetails.handle}</Text>
              <Text size="1.2rem" b>Friends: {userDetails.friendOfCount}</Text>
              <Text size="1.2rem" b>Rank: {userDetails.rank}</Text>
              <Text size="1.2rem" b>Rating: {userDetails.rating}</Text>
              <Text size="1.2rem" b> Last Online:
                {moment
                  .unix(userDetails.lastOnlineTimeSeconds)
                  .format("MMMM Do, YY")}
              </Text>
            </Row>
            <Col css={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: "2rem" }}>
              <Text h3>Status</Text>
              <Grid.Container gap={4} wrap="wrap">
                {userStatus?.map((status, idx) => {
                  return (
                    <Grid gap={2} xs={6} key={idx}>
                      <Card css={{ mw: "100%", p: "0", m: "0" }}>
                        <Text size="1.2rem">Name : {status.problem.name}</Text>
                        <Text size="1.2rem">Points: {status.problem?.points}</Text>
                        <Text size="1.2rem">Type: {status.problem.type}</Text>
                        <Text size="1.2rem">Tags: {status.problem.tags.join(", ")}</Text>
                        <Text size="1.2rem">Passed Test: {status.passedTestCount}</Text>
                        <Text size="1.2rem">Language: {status.programmingLanguage}</Text>
                        <Text size="1.2rem">Time consumed: {status.timeConsumedMillis}ms</Text>
                        <Text size="1.2rem">Verdict: {status.verdict}</Text>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid.Container>
            </Col>
          </>
        )}
      </Grid>
    </Container >
  );
};

export default Codeforces;
