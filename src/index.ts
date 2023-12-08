import 'dotenv/config'

import { IgApiClient } from 'instagram-private-api'
import { sample } from 'lodash'

const ig = new IgApiClient()

async function run() {
  const username = process.env.IG_USERNAME
  if (!username) throw new Error('IG_USERNAME is missing')

  const password = process.env.IG_PASSWORD
  if (!password) throw new Error('IG_PASSWORD is missing')

  ig.state.generateDevice(username)

  await ig.simulate.preLoginFlow()
  const loggedInUser = await ig.account.login(username, password)

  process.nextTick(async () => ig.simulate.postLoginFlow())
  const userFeed = ig.feed.user(loggedInUser.pk)
  const myPostsFirstPage = await userFeed.items()
  const myPostsSecondPage = await userFeed.items()
  console.log({ myPostsFirstPage, myPostsSecondPage })
}

void run()
